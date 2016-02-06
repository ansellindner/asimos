$(document).ready(function(){
$('#refreshLogo').addClass('fa-spin');
	function btcUpdate(){
		var blkBehind = 0;
		var blks = 0;
		var currentblk = 0;
		
		$.getJSON('/api/buptime',function(data){
			$('#bupDisp').html(data);
		});
		
		$.getJSON('/api/getinfo',function(data){
			$('#bupDif').html(data['difficulty']);
			blks = data['blocks'];
			$('#bupPeers').html(data['connections']);
			$('#bupPver').html(data['protocolversion']);
			$('#bupBlkCnt').html(blks);
			
			$.getJSON('https://api.smartbit.com.au/v1/blockchain/totals',function(data){
				currentblk = data['totals']['block_count'];
				blkBehind = currentblk - blks;
				$('#bupBlkBehind').html(blkBehind);
				$('#refreshLogo').removeClass('fa-spin');
			});
			
		});
		
		$.getJSON('https://api.ipify.org/?format=json',function(data){
			$('#extIPDisp').html(data['ip']);
		});
		$.getJSON('http://theindex.io/api/',function(data){
			$('#indxPDisp').html(data['btc_usd']);
		});
		$.getJSON('https://api.smartbit.com.au/v1/blockchain/stats',function(data){
			$('#24hrDisp').html(data['stats']['transaction_count']);
			$('#avgBlkDisp').html(data['stats']['block_interval_min']);
			$('#hashDisp').html(data['stats']['hash_rate_gh']);
			
		});
		
		$('em').css('color','#666');
		
		$('#bupPeersli').click(function(){
			$.getJSON('/api/getpeerinfo',function(data){
				var htmlData;
				$.each(data,function(k,v){
					var peerID = k;
					$.each(v,function(key,value){
						console.log(key+" => "+value); 
					});
				});
			});
		});
	}
	btcUpdate();
});