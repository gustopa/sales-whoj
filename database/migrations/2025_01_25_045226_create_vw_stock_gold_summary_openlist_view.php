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
        DB::statement("CREATE VIEW `vw_stock_gold_summary_openlist` AS select `a`.`period` AS `period`,`a`.`gold_type_id` AS `gold_type_id`,`a`.`gold_type_id_txt` AS `gold_type_id_txt`,sum(`a`.`weight`) AS `weight` from (`" . env('DB_DATABASE') . "`.`vw_stock_gold_transactionlist` `a` join `" . env('DB_DATABASE') . "`.`periode_stock` `b` on(`a`.`period` = `b`.`periode`)) group by `a`.`period`,`a`.`gold_type_id`,`a`.`gold_type_id_txt`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_stock_gold_summary_openlist`");
    }
};
