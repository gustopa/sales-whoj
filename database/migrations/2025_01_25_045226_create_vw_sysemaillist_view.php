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
        DB::statement("CREATE VIEW `vw_sysemaillist` AS select `" . env('DB_DATABASE') . "`.`sysemail`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysemail`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`sysemail`.`email_from` AS `email_from`,`email_from`.`name` AS `email_from_txt`,`" . env('DB_DATABASE') . "`.`sysemail`.`email_to` AS `email_to`,`email_to`.`name` AS `email_to_txt`,`" . env('DB_DATABASE') . "`.`sysemail`.`email_subject` AS `email_subject`,`" . env('DB_DATABASE') . "`.`sysemail`.`attachment` AS `attachment`,`" . env('DB_DATABASE') . "`.`sysemail`.`content` AS `content`,`" . env('DB_DATABASE') . "`.`sysemail`.`is_send` AS `is_send`,`" . env('DB_DATABASE') . "`.`sysemail`.`send_date` AS `send_date`,`" . env('DB_DATABASE') . "`.`sysemail`.`txt` AS `txt`,`" . env('DB_DATABASE') . "`.`sysemail`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysemail`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysemail`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysemail`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysemail`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysemail`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`sysemail` left join `" . env('DB_DATABASE') . "`.`sysemployee` `email_from` on(`" . env('DB_DATABASE') . "`.`sysemail`.`email_from` = `email_from`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`sysemployee` `email_to` on(`" . env('DB_DATABASE') . "`.`sysemail`.`email_to` = `email_to`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysemaillist`");
    }
};
