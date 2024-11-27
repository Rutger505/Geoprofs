<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WelcomeMail extends Mailable
{
    use Queueable, SerializesModels;


    public function build()
    {
        return $this->view('emails.mail')
                    ->subject('Welcome to Our Application');

    }
}
