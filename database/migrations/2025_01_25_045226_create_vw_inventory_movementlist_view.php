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
        DB::statement("CREATE VIEW `vw_inventory_movementlist` AS select `" . env('DB_DATABASE') . "`.`inventory_movement`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`inventory_movement`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`inventory_movement`.`inventory_id` AS `inventory_id`,`" . env('DB_DATABASE') . "`.`inventory`.`identity_code` AS `inventory_id_txt`,`" . env('DB_DATABASE') . "`.`inventory_movement`.`store_id` AS `store_id`,`" . env('DB_DATABASE') . "`.`store`.`name` AS `store_id_txt`,`" . env('DB_DATABASE') . "`.`inventory_movement`.`notes` AS `notes`,`" . env('DB_DATABASE') . "`.`inventory_movement`.`trans_date` AS `trans_date`,`" . env('DB_DATABASE') . "`.`inventory_movement`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`inventory_movement`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`inventory_movement`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`inventory_movement`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`inventory_movement`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`inventory_movement`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`inventory_movement` left join `" . env('DB_DATABASE') . "`.`inventory` on(`" . env('DB_DATABASE') . "`.`inventory_movement`.`inventory_id` = `" . env('DB_DATABASE') . "`.`inventory`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`store` on(`" . env('DB_DATABASE') . "`.`inventory_movement`.`store_id` = `" . env('DB_DATABASE') . "`.`store`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_inventory_movementlist`");
    }
};
