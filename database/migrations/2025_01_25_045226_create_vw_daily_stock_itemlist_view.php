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
        DB::statement("CREATE VIEW `vw_daily_stock_itemlist` AS select `" . env('DB_DATABASE') . "`.`daily_stock_item`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`daily_stock_item`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`daily_stock_item`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`daily_stock_item`.`item_id` AS `item_id`,`" . env('DB_DATABASE') . "`.`item`.`name` AS `item_id_txt`,`" . env('DB_DATABASE') . "`.`daily_stock_item`.`position_id` AS `position_id`,`" . env('DB_DATABASE') . "`.`position`.`name` AS `position_id_txt`,`" . env('DB_DATABASE') . "`.`daily_stock_item`.`total` AS `total`,`" . env('DB_DATABASE') . "`.`daily_stock_item`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`daily_stock_item`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`daily_stock_item`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`daily_stock_item`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`daily_stock_item`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`daily_stock_item` left join `" . env('DB_DATABASE') . "`.`item` on(`" . env('DB_DATABASE') . "`.`daily_stock_item`.`item_id` = `" . env('DB_DATABASE') . "`.`item`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`position` on(`" . env('DB_DATABASE') . "`.`daily_stock_item`.`position_id` = `" . env('DB_DATABASE') . "`.`position`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_daily_stock_itemlist`");
    }
};
