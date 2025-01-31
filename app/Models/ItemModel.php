<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemModel extends Model
{
    protected $table = "item";
    protected $guarded = [];
    public $timestamps = false;
}
