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
        DB::statement("CREATE VIEW `vw_production_diamond_finishedlist` AS select `" . env('DB_DATABASE') . "`.`production_diamond_finished`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`production_diamond_finished`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`production_diamond_finished`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`production_diamond_finished`.`diamond_type` AS `diamond_type`,`" . env('DB_DATABASE') . "`.`production_diamond_finished`.`grain` AS `grain`,`" . env('DB_DATABASE') . "`.`production_diamond_finished`.`grade` AS `grade`,`" . env('DB_DATABASE') . "`.`production_diamond_finished`.`color` AS `color`,`" . env('DB_DATABASE') . "`.`production_diamond_finished`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`production_diamond_finished`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`production_diamond_finished`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`production_diamond_finished`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`production_diamond_finished`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`production_diamond_finished`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_production_diamond_finishedlist`");
    }
};
