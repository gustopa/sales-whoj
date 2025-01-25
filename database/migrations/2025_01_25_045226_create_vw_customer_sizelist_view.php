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
        DB::statement("CREATE VIEW `vw_customer_sizelist` AS select `" . env('DB_DATABASE') . "`.`customer_size`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`customer_size`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`customer_size`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`customer_size`.`product` AS `product`,`" . env('DB_DATABASE') . "`.`customer_size`.`txt` AS `txt`,`" . env('DB_DATABASE') . "`.`customer_size`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`customer_size`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`customer_size`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`customer_size`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`customer_size`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`customer_size`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_customer_sizelist`");
    }
};
