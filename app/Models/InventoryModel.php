<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryModel extends Model
{
    protected $table = "inventory";
    protected $guarded = [];
    public $timestamps = false;
}
