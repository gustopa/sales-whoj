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
        DB::statement("CREATE VIEW `vw_miscellaneouslist` AS select `" . env('DB_DATABASE') . "`.`miscellaneous`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`miscellaneous`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`miscellaneous`.`nama` AS `nama`,`" . env('DB_DATABASE') . "`.`miscellaneous`.`item` AS `item`,`" . env('DB_DATABASE') . "`.`miscellaneous`.`keterangan` AS `keterangan`,`" . env('DB_DATABASE') . "`.`miscellaneous`.`trans_date` AS `trans_date`,`" . env('DB_DATABASE') . "`.`miscellaneous`.`location_id` AS `location_id`,`" . env('DB_DATABASE') . "`.`location`.`name` AS `location_id_txt`,`" . env('DB_DATABASE') . "`.`miscellaneous`.`store_id` AS `store_id`,`" . env('DB_DATABASE') . "`.`store`.`name` AS `store_id_txt`,`" . env('DB_DATABASE') . "`.`miscellaneous`.`foto` AS `foto`,`" . env('DB_DATABASE') . "`.`miscellaneous`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`miscellaneous`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`miscellaneous`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`miscellaneous`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`miscellaneous`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`miscellaneous`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`miscellaneous` left join `" . env('DB_DATABASE') . "`.`location` on(`" . env('DB_DATABASE') . "`.`miscellaneous`.`location_id` = `" . env('DB_DATABASE') . "`.`location`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`store` on(`" . env('DB_DATABASE') . "`.`miscellaneous`.`store_id` = `" . env('DB_DATABASE') . "`.`store`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_miscellaneouslist`");
    }
};
