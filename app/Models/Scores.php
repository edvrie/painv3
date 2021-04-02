<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scores extends Model
{
    protected $table = 'scores';
    protected $fillable = ['score', 'date'];
    public $timestamps = false;
    protected $primaryKey = 'id_SCORES';
}
