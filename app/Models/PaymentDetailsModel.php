<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentDetailsModel extends Model
{
    protected $table = "payment_detail";
    protected $guarded = [];
    public $timestamps = false;
}
