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
        DB::statement("CREATE VIEW `vw_syswebinfolist` AS select `" . env('DB_DATABASE') . "`.`syswebinfo`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`application_name` AS `application_name`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`web_title` AS `web_title`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`web_description` AS `web_description`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`file_logo_w` AS `file_logo_w`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`file_logo_c` AS `file_logo_c`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`file_icon` AS `file_icon`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`format_date` AS `format_date`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`currency` AS `currency`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`email_admin` AS `email_admin`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`email_from` AS `email_from`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`email_contact_name` AS `email_contact_name`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`smtp_host` AS `smtp_host`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`smtp_port` AS `smtp_port`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`smtp_user` AS `smtp_user`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`smtp_pass` AS `smtp_pass`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`syswebinfo`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`syswebinfo`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_syswebinfolist`");
    }
};
