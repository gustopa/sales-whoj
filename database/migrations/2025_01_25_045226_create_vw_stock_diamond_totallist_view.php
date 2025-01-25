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
        DB::statement("CREATE VIEW `vw_stock_diamond_totallist` AS select `a`.`row_id` AS `row_id`,`a`.`company_id` AS `company_id`,`a`.`category` AS `category`,`a`.`diamond_type` AS `diamond_type`,`a`.`diamond_shape` AS `diamond_shape`,`a`.`name` AS `name`,`a`.`txt` AS `txt`,ifnull(`b`.`pcs`,0) AS `pcs`,ifnull(`b`.`crt`,0) AS `crt`,`a`.`is_deleted` AS `is_deleted`,`a`.`is_submitted` AS `is_submitted` from (`" . env('DB_DATABASE') . "`.`vw_diamond_typelist` `a` left join `" . env('DB_DATABASE') . "`.`vw_stock_diamond_summary_openlist` `b` on(`a`.`row_id` = `b`.`diamond_type_id`)) where `a`.`is_submitted` = 1 and `a`.`is_deleted` = 0");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_stock_diamond_totallist`");
    }
};
