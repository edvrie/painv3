<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $table = 'users';
    protected $fillable = ['username', 'password', 'email', 'userId', 'nickname'];
    public $timestamps = false;
    protected $primaryKey = 'id_USERS';
}
