<?php

namespace VacStatus\Http\Controllers\APIv1;

use VacStatus\Http\Controllers\Controller;

use VacStatus\Models\DonationLog;
use VacStatus\Models\DonationPerk;
use VacStatus\Models\User;

use Mdb\PayPal\Ipn\Event\MessageVerifiedEvent;
use Mdb\PayPal\Ipn\ListenerBuilder\Guzzle\InputStreamListenerBuilder as ListenerBuilder;
use Mdb\PayPal\Ipn\Event\MessageInvalidEvent;
use Mdb\PayPal\Ipn\Event\MessageVerificationFailureEvent;

use Cache;
use Auth;
use Log;

class DonationController extends Controller
{
	public function index()
	{
		$latestDonation = DonationLog::latest();
		$mostDonation = User::mostDonation();
		$donationPerk = DonationPerk::orderBy('amount', 'asc')->get();

		$user = null;

		if(Auth::check()) $user = Auth::user();

		return compact('user', 'latestDonation', 'mostDonation', 'donationPerk');
	}

	public function IPNAction()
	{
		$listener = new ListenerBuilder;

		if (\App::environment('local', 'staging'))
		{
			$listener->useSandbox();
		}

		$listener = $listener->build();

		$listener->onVerified(function (MessageVerifiedEvent $event) {
			$ipnMessage = $event->getMessage();

			$status = $ipnMessage->get('payment_status');
			$original_amount = $ipnMessage->get('mc_gross');
			$amount_sub = $ipnMessage->get('mc_fee');
			$smallId = $ipnMessage->get('custom');

			Log::info('Donation IPN', [
				'status' => $status,
				'amount' => $original_amount,
				'subtracted' => $amount_sub,
				'small_id' => $smallId
			]);

			if($status != 'Completed') return;

			$donationLog = new DonationLog;
			$donationLog->status = 'Completed';
			$donationLog->amount = $original_amount - $amount_sub;
			$donationLog->original_amount = $original_amount;

			if(is_numeric($smallId))
			{
				$user = User::whereSmallId($smallId)->first();
				if(isset($user->id))
				{
					$user->donation += $original_amount;
					$user->save();
					$donationLog->small_id = $smallId;
					Cache::forget("profile_{$smallId}");
				}
			}

			$donationLog->save();
		});

		$listener->onInvalid(function (MessageInvalidEvent $event) {
		   $ipnMessage = $event->getMessage();

			Log::error('Donation IPN', [
				'status' => $ipnMessage,
			]);
		});

		$listener->onVerificationFailure(function (MessageVerificationFailureEvent $event) {
			$error = $event->getError();

			Log::error('Donation IPN', [
				'status' => $error,
			]);
		});

		$listener->listen();
	}
}