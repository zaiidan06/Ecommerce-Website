<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
// use App\Models\Transaction;1
// use Illuminate\Support\Facades\DB;1


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {

        // DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // // Hapus data dari tabel transactions terlebih dahulu
        // Transaction::query()->delete();

        // // Hapus data dari tabel users
        // User::query()->delete();

        // // Aktifkan kembali constraint foreign key
        // DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // User::truncate();
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
