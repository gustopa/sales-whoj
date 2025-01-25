<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("CREATE VIEW `vw_photo_inventorylist` AS select `" . env('DB_DATABASE') . "`.`photo_inventory`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`photo_inventory`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`photo_inventory`.`photo` AS `photo`,`" . env('DB_DATABASE') . "`.`photo_inventory`.`notes` AS `notes`,`" . env('DB_DATABASE') . "`.`photo_inventory`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`photo_inventory`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`photo_inventory`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`photo_inventory`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`photo_inventory`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`photo_inventory`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`photo_inventory`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_photo_inventorylist`");
    }
};
