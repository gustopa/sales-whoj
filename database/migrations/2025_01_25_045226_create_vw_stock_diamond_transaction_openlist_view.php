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
        DB::statement("CREATE VIEW `vw_stock_diamond_transaction_openlist` AS select `a`.`row_id` AS `row_id`,`a`.`period` AS `period`,`a`.`trans_date` AS `trans_date`,`a`.`trans_no` AS `trans_no`,`a`.`trans_name` AS `trans_name`,`a`.`trans_type` AS `trans_type`,`a`.`trans_txt` AS `trans_txt`,`a`.`diamond_type_id` AS `diamond_type_id`,`a`.`diamond_type_id_txt` AS `diamond_type_id_txt`,`a`.`pcs` AS `pcs`,`a`.`crt` AS `crt` from (`" . env('DB_DATABASE') . "`.`vw_stock_diamond_transactionlist` `a` join `" . env('DB_DATABASE') . "`.`periode_stock` `b` on(`a`.`period` = `b`.`periode`)) where `b`.`status` = 'Open'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_stock_diamond_transaction_openlist`");
    }
};
