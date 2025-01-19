<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class GenerateSchema extends Command
{
    protected $signature = 'generate:schema';
    protected $description = 'Generate database schema (including views) and save it as a JSON file';

    public function handle()
    {
        $database = env('DB_DATABASE');

        // Query untuk mendapatkan semua tabel dan view
        $tablesAndViews = DB::select("SHOW FULL TABLES FROM `$database`");

        $schema = [];

        foreach ($tablesAndViews as $entry) {
            $tableOrViewName = $entry->{"Tables_in_$database"};
            $type = $entry->Table_type === 'VIEW' ? 'view' : 'table';

            // Ambil kolom untuk setiap tabel atau view
            $columns = DB::select("SHOW COLUMNS FROM `$tableOrViewName`");
            $columnNames = array_map(fn($col) => $col->Field, $columns);

            $schema[$tableOrViewName] = [
                'type' => $type,
                'description' => $type === 'view'
                    ? "This is a view: $tableOrViewName"
                    : "This is a table: $tableOrViewName",
                'columns' => $columnNames,
            ];
        }

        // Simpan skema ke file JSON
        $path = 'schema/schema.json';
        Storage::put($path, json_encode($schema, JSON_PRETTY_PRINT));

        $this->info("Schema has been generated and saved to storage/app/{$path}");
    }
}