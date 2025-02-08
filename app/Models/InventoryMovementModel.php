<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryMovementModel extends Model
{
    protected $table = "inventory_movement";
    protected $guarded = [];
    public $timestamps = false;
}
