<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryCalculationModel extends Model
{
    protected $table = "inventory_price_calculation";
    protected $guarded = [];
    public $timestamps = false;
}
