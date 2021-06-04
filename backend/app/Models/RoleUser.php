<?php
/**
 * Created by PhpStorm.
 * User: tamir
 * Date: 6/1/2021
 * Time: 9:39 AM
 */

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class RoleUser extends Model
{
    protected $table = 'role_user';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'role_id'
    ];

}