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
        DB::statement("CREATE VIEW `vw_stock_diamond_summary_openlist` AS select `a`.`period` AS `period`,`a`.`diamond_type_id` AS `diamond_type_id`,`a`.`diamond_type_id_txt` AS `diamond_type_id_txt`,sum(`a`.`crt`) AS `crt`,sum(`a`.`pcs`) AS `pcs` from (`" . env('DB_DATABASE') . "`.`vw_stock_diamond_transactionlist` `a` join `" . env('DB_DATABASE') . "`.`periode_stock` `b` on(`a`.`period` = `b`.`periode`)) group by `a`.`period`,`a`.`diamond_type_id`,`a`.`diamond_type_id_txt`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_stock_diamond_summary_openlist`");
    }
};
