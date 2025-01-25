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
        DB::statement("CREATE VIEW `vw_productionlist` AS select `" . env('DB_DATABASE') . "`.`production`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`production`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`production`.`doc_no` AS `doc_no`,`" . env('DB_DATABASE') . "`.`production`.`request_order_id` AS `request_order_id`,`" . env('DB_DATABASE') . "`.`request_order`.`doc_no` AS `request_order_id_txt`,`" . env('DB_DATABASE') . "`.`production`.`item_type_id` AS `item_type_id`,`" . env('DB_DATABASE') . "`.`item_type`.`name` AS `item_type_id_txt`,`" . env('DB_DATABASE') . "`.`production`.`item_id` AS `item_id`,`" . env('DB_DATABASE') . "`.`item`.`name` AS `item_id_txt`,`" . env('DB_DATABASE') . "`.`production`.`model_id` AS `model_id`,`" . env('DB_DATABASE') . "`.`model`.`name` AS `model_id_txt`,`" . env('DB_DATABASE') . "`.`production`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`production`.`txt` AS `txt`,`" . env('DB_DATABASE') . "`.`production`.`identity_code` AS `identity_code`,`" . env('DB_DATABASE') . "`.`production`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`production`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`production`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`production`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`production`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`production`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`production`.`modified_by` AS `modified_by` from ((((`" . env('DB_DATABASE') . "`.`production` left join `" . env('DB_DATABASE') . "`.`request_order` on(`" . env('DB_DATABASE') . "`.`production`.`request_order_id` = `" . env('DB_DATABASE') . "`.`request_order`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`item_type` on(`" . env('DB_DATABASE') . "`.`production`.`item_type_id` = `" . env('DB_DATABASE') . "`.`item_type`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`item` on(`" . env('DB_DATABASE') . "`.`production`.`item_id` = `" . env('DB_DATABASE') . "`.`item`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`model` on(`" . env('DB_DATABASE') . "`.`production`.`model_id` = `" . env('DB_DATABASE') . "`.`model`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_productionlist`");
    }
};
