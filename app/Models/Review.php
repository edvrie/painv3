<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $table = 'review';
    protected $fillable = ['rating', 'description'];
    public $timestamps = false;
    protected $primaryKey = 'id_REVIEW';
}
