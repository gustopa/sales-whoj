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

        DB::statement("CREATE VIEW `vw_customer_visitlist` AS select `" . env('DB_DATABASE') . "`.`customer_visit`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`customer_visit`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`customer_visit`.`customer_id` AS `customer_id`,`" . env('DB_DATABASE') . "`.`customer`.`name` AS `customer_id_txt`,`" . env('DB_DATABASE') . "`.`customer_visit`.`inventory_id` AS `inventory_id`,`inventory`.`identity_code` AS `inventory_id_txt`,`inventory`.`item_id_txt` AS `item_id_txt`,`" . env('DB_DATABASE') . "`.`customer_visit`.`trans_date` AS `trans_date`,`" . env('DB_DATABASE') . "`.`customer_visit`.`notes` AS `notes`,`" . env('DB_DATABASE') . "`.`customer_visit`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`customer_visit`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`customer_visit`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`customer_visit`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`customer_visit`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`customer_visit`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`customer_visit` left join `" . env('DB_DATABASE') . "`.`customer` on(`" . env('DB_DATABASE') . "`.`customer_visit`.`customer_id` = `" . env('DB_DATABASE') . "`.`customer`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`vw_inventorylist` `inventory` on(`" . env('DB_DATABASE') . "`.`customer_visit`.`inventory_id` = `inventory`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_customer_visitlist`");
    }
};
