<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Users::create(
            [
                'firstName' => 'Alex',
                'lastName' => 'Lev',
                'email' => 'alex-lev@gmail.com',
                'password' => Hash::make('123123'),
            ]
        );

        Users::create(
            [
                'firstName' => 'Bar',
                'lastName' => 'Nati',
                'email' => 'bar-nati@gmail.com',
                'password' => Hash::make('123123'),
            ]
        );

        Users::create(
            [
                'firstName' => 'Ariel',
                'lastName' => 'Medina',
                'email' => 'ariel-medina@gmail.com',
                'password' => Hash::make('123123'),
            ]
        );

        Users::create(
            [
                'firstName' => 'Naftali',
                'lastName' => 'Bennett',
                'email' => 'naftali-bennett@gmail.com',
                'password' => Hash::make('123123'),
            ]
        );

        Users::create(
            [
                'firstName' => 'Leanne',
                'lastName' => 'Graham',
                'email' => 'Sincere@april.biz',
                'password' => Hash::make('123123'),
            ]
        );

        Users::create(
            [
                'firstName' => 'Ervin',
                'lastName' => 'Howell',
                'email' => 'Shanna@melissa.tv',
                'password' => Hash::make('123123'),
            ]
        );

        Users::create(
            [
                'firstName' => 'Clementine',
                'lastName' => 'Bauch',
                'email' => 'Nathan@yesenia.net',
                'password' => Hash::make('123123'),
            ]
        );

        Users::create(
            [
                'firstName' => 'Patricia',
                'lastName' => 'Lebsack',
                'email' => 'Julianne.OConner@kory.org',
                'password' => Hash::make('123123'),
            ]
        );
    }
}
