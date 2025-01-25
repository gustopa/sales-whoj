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
        DB::statement("CREATE VIEW `vw_stock_gold_summarylist` AS select `vw_stock_gold_transactionlist`.`period` AS `period`,`vw_stock_gold_transactionlist`.`gold_type_id` AS `gold_type_id`,`vw_stock_gold_transactionlist`.`gold_type_id_txt` AS `gold_type_id_txt`,sum(`vw_stock_gold_transactionlist`.`weight`) AS `weight` from `" . env('DB_DATABASE') . "`.`vw_stock_gold_transactionlist` group by `vw_stock_gold_transactionlist`.`period`,`vw_stock_gold_transactionlist`.`gold_type_id`,`vw_stock_gold_transactionlist`.`gold_type_id_txt`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_stock_gold_summarylist`");
    }
};
