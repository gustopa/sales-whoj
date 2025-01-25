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
        DB::statement("CREATE VIEW `vw_grouping_orderlist` AS select `" . env('DB_DATABASE') . "`.`grouping_order`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`grouping_order`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`grouping_order`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`grouping_order`.`item_id` AS `item_id`,`" . env('DB_DATABASE') . "`.`item`.`name` AS `item_id_txt`,`" . env('DB_DATABASE') . "`.`grouping_order`.`gold_weight` AS `gold_weight`,`" . env('DB_DATABASE') . "`.`grouping_order`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`grouping_order`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`grouping_order`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`grouping_order`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`grouping_order`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`grouping_order`.`modified_by` AS `modified_by` from (`" . env('DB_DATABASE') . "`.`grouping_order` left join `" . env('DB_DATABASE') . "`.`item` on(`" . env('DB_DATABASE') . "`.`grouping_order`.`item_id` = `" . env('DB_DATABASE') . "`.`item`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_grouping_orderlist`");
    }
};
