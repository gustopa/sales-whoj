<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentTypeModel extends Model
{
    protected $table = "payment_type";
    protected $guarded = [];
    public $timestamps = false;
}
