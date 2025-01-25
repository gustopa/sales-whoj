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
        DB::statement("CREATE VIEW `vw_stock_diamond_summarylist` AS select `vw_stock_diamond_transactionlist`.`period` AS `period`,`vw_stock_diamond_transactionlist`.`diamond_type_id` AS `diamond_type_id`,`vw_stock_diamond_transactionlist`.`diamond_type_id_txt` AS `diamond_type_id_txt`,sum(`vw_stock_diamond_transactionlist`.`crt`) AS `crt`,sum(`vw_stock_diamond_transactionlist`.`pcs`) AS `pcs` from `" . env('DB_DATABASE') . "`.`vw_stock_diamond_transactionlist` group by `vw_stock_diamond_transactionlist`.`period`,`vw_stock_diamond_transactionlist`.`diamond_type_id`,`vw_stock_diamond_transactionlist`.`diamond_type_id_txt`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_stock_diamond_summarylist`");
    }
};
