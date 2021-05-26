<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $table = 'game';
    protected $fillable = ['name','timesPlayed', 'rating', 'description', 'category'];
    public $timestamps = false;
    protected $primaryKey = 'id_GAME';
}
