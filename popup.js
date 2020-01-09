$(function()
{
    $('#amount').val(0);
    var newToal=0;
    chrome.storage.sync.get(['total','limit'],function(budget)
    {
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    })

    
    $('#spendAmount').click(function()
    {
        chrome.storage.sync.get('total', function(budget)
        {
            
            var newTotal=0;
            var amount=$('#amount').val();
            if(amount)
            {
                newToal+=parseInt(amount);
                newTotal+=parseInt(amount);

            }
            if(budget.total)
            {
                newTotal+=parseInt(budget.total);
            }

            chrome.storage.sync.set({'total': newTotal},function(){
                if(amount && newTotal>=budget.limit){
                    var notifOptions = {
                        type:'basic',
                        iconUrl:'icon48.png',
                        title:'limit reached',
                        message: "feeling awesome you did!!"
                    };
                    chrome.notifications.create('limitnotif',notifOptions);

                }
            });
            $('#toal').text(newToal);
            $('#total').text(newTotal);
            $('#amount').val('');
        });

    });


    $('#reset').click(function()
    {
        newTotal=0;
        chrome.storage.sync.set({'total': newTotal});
        $('#total').text(newTotal);
    });
});