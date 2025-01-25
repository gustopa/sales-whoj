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
        DB::statement("CREATE VIEW `vw_shippinglist` AS select `" . env('DB_DATABASE') . "`.`shipping`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`shipping`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`shipping`.`customer_id` AS `customer_id`,`" . env('DB_DATABASE') . "`.`customer`.`name` AS `customer_id_txt`,`" . env('DB_DATABASE') . "`.`shipping`.`payment_id` AS `payment_id`,`" . env('DB_DATABASE') . "`.`payment`.`doc_no` AS `payment_id_txt`,`" . env('DB_DATABASE') . "`.`shipping`.`shipping_date` AS `shipping_date`,`" . env('DB_DATABASE') . "`.`shipping`.`no_resi` AS `no_resi`,`" . env('DB_DATABASE') . "`.`shipping`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`shipping`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`shipping`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`shipping`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`shipping`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`shipping`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`shipping`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`shipping` left join `" . env('DB_DATABASE') . "`.`customer` on(`" . env('DB_DATABASE') . "`.`shipping`.`customer_id` = `" . env('DB_DATABASE') . "`.`customer`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`payment` on(`" . env('DB_DATABASE') . "`.`shipping`.`payment_id` = `" . env('DB_DATABASE') . "`.`payment`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_shippinglist`");
    }
};
