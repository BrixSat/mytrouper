<?php
require_once '../../includes/config.php';

class FacebookUsers
{
    public static function checkuser($fuid='',$fname='',$femail='')
    {
	$query = "SELECT * FROM users_facebook WHERE fuid = ? ";
        $query_val = array($fuid);
	$result = DB::SelectFromTable($query,$query_val);
	
	if(empty($result))
	{
	    $str_table_name ='users_facebook';
	    $arr_details = array( 'fuid' => $fuid,'fname' => $fname,'femail' => $femail);
	    
	    $result = DB::InsertToTable($str_table_name,$arr_details);
	}
	else
	{
	    $str_table_name ='users_facebook';
	    $arr_details = array( 'fuid' => $fuid,'fname' => $fname,'femail' => $femail);
	    $str_primary_key = array( 'fuid' => $fuid);
	    $result = DB::UpdateTable($str_table_name, $arr_details, $str_primary_key);
	}
    }
}
