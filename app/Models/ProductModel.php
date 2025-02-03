<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductModel extends Model
{
    protected $table = "product_name";
    protected $guarded = [];
    public $timestamps = false;
}
