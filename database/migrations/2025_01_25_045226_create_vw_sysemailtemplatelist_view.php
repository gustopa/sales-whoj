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
        DB::statement("CREATE VIEW `vw_sysemailtemplatelist` AS select `" . env('DB_DATABASE') . "`.`sysemailtemplate`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysemailtemplate`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`sysemailtemplate`.`content_for` AS `content_for`,`" . env('DB_DATABASE') . "`.`sysemailtemplate`.`email_subject` AS `email_subject`,`" . env('DB_DATABASE') . "`.`sysemailtemplate`.`email_txt` AS `email_txt`,`" . env('DB_DATABASE') . "`.`sysemailtemplate`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysemailtemplate`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysemailtemplate`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysemailtemplate`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysemailtemplate`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysemailtemplate`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`sysemailtemplate`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysemailtemplatelist`");
    }
};
