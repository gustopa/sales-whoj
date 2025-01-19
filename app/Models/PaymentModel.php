<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentModel extends Model
{
    protected $table = "payment";
    protected $guarded = [];
    public $timestamps = false;
}
