<?php

require_once(SITE_FILE.'theme/modules/get_id_3/getid3.php');

class AudioInfo {

	var $result = NULL;
	var $info   = NULL;

	function AudioInfo() {
		// Initialize getID3 engine
		$this->getID3 = new getID3;
		$this->getID3->option_md5_data        = true;
		$this->getID3->option_md5_data_source = true;
		$this->getID3->encoding               = 'UTF-8';
	}

	function Info($file) {

		// Analyze file
		$this->info = $this->getID3->analyze($file);

		// Exit here on error
		if (isset($this->info['error'])) {
			return array ('error' => $this->info['error']);
		}

		// Init wrapper object
		$this->result = array();
		$this->result['format_name']     = (isset($this->info['fileformat']) ? $this->info['fileformat'] : '').'/'.(isset($this->info['audio']['dataformat']) ? $this->info['audio']['dataformat'] : '').(isset($this->info['video']['dataformat']) ? '/'.$this->info['video']['dataformat'] : '');
		$this->result['encoder_version'] = (isset($this->info['audio']['encoder'])         ? $this->info['audio']['encoder']         : '');
		$this->result['encoder_options'] = (isset($this->info['audio']['encoder_options']) ? $this->info['audio']['encoder_options'] : '');
		$this->result['bitrate_mode']    = (isset($this->info['audio']['bitrate_mode'])    ? $this->info['audio']['bitrate_mode']    : '');
		$this->result['channels']        = (isset($this->info['audio']['channels'])        ? $this->info['audio']['channels']        : '');
		$this->result['sample_rate']     = (isset($this->info['audio']['sample_rate'])     ? $this->info['audio']['sample_rate']     : '');
		$this->result['bits_per_sample'] = (isset($this->info['audio']['bits_per_sample']) ? $this->info['audio']['bits_per_sample'] : '');
		$this->result['playing_time']    = (isset($this->info['playtime_seconds'])         ? $this->info['playtime_seconds']         : '');
		$this->result['avg_bit_rate']    = (isset($this->info['audio']['bitrate'])         ? $this->info['audio']['bitrate']         : '');
		$this->result['tags']            = (isset($this->info['tags'])                     ? $this->info['tags']                     : '');
		$this->result['comments']        = (isset($this->info['comments'])                 ? $this->info['comments']                 : '');
		$this->result['warning']         = (isset($this->info['warning'])                  ? $this->info['warning']                  : '');
		$this->result['md5']             = (isset($this->info['md5_data'])                 ? $this->info['md5_data']                 : '');

		// Post getID3() data handling based on file format
		$method = (isset($this->info['fileformat']) ? $this->info['fileformat'] : '').'Info';
		if ($method && method_exists($this, $method)) {
			$this->$method();
		}

		return $this->result;
	}

	function aacInfo() {
		$this->result['format_name']     = 'AAC';
	}

	function riffInfo() {
		if ($this->info['audio']['dataformat'] == 'wav') {

			$this->result['format_name'] = 'Wave';

		} elseif (preg_match('#^mp[1-3]$#', $this->info['audio']['dataformat'])) {

			$this->result['format_name'] = strtoupper($this->info['audio']['dataformat']);

		} else {

			$this->result['format_name'] = 'riff/'.$this->info['audio']['dataformat'];

		}
	}

	function flacInfo() {
		$this->result['format_name']     = 'FLAC';
	}

	function macInfo() {
		$this->result['format_name']     = 'Monkey\'s Audio';
	}

	function laInfo() {
		$this->result['format_name']     = 'La';
	}

	function oggInfo() {
		if ($this->info['audio']['dataformat'] == 'vorbis') {

			$this->result['format_name']     = 'Ogg Vorbis';

		} else if ($this->info['audio']['dataformat'] == 'flac') {

			$this->result['format_name'] = 'Ogg FLAC';

		} else if ($this->info['audio']['dataformat'] == 'speex') {

			$this->result['format_name'] = 'Ogg Speex';

		} else {

			$this->result['format_name'] = 'Ogg '.$this->info['audio']['dataformat'];

		}
	}

	function mpcInfo() {
		$this->result['format_name']     = 'Musepack';
	}

	function mp3Info() {
		$this->result['format_name']     = 'MP3';
	}

	function mp2Info() {
		$this->result['format_name']     = 'MP2';
	}

	function mp1Info() {
		$this->result['format_name']     = 'MP1';
	}

	function asfInfo() {
		$this->result['format_name']     = strtoupper($this->info['audio']['dataformat']);
	}

	function realInfo() {
		$this->result['format_name']     = 'Real';
	}

	function vqfInfo() {
		$this->result['format_name']     = 'VQF';
	}

}
