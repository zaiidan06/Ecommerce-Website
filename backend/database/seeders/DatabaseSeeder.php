<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {

        User::truncate();
        User::factory()->create(
            [
                'name' => 'admin1',
                'email' => 'admin1@gmail.com',
                'password' => 'admin1',
                'isAdmin' => 1,
            ],

        );
        User::factory()->create(
            [
                'name' => 'user1',
                'email' => 'user1@gmail.com',
                'password' => 'user1',
                'isAdmin' => 0,
            ],

        );
        User::factory(10)->create();

        // $this->call([
        //     ProductSeeder::class
        // ]);
    }
}
