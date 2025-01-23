<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserModel extends Model
{
    protected $table = "sysuser";
    protected $guarded = [];
    public $timestamps = false;
}
