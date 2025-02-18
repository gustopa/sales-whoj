<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhotoModel extends Model
{
    protected $table = "photo_inventory";
    protected $guarded = [];
    public $timestamps = false;
}
