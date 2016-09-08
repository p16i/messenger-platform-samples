var Machine = {
    callSendAPI: null,
    run: function(query){
        if( !query.busNo ){
            this.askBusNo( query );

        } else if ( !query.origin ) {
            this.askOrigin( query );

        } else if ( !query.direction){
            this.askDirection(query);
        } else {
            this.response(query);
        }
    },
    askOrigin: function(query){

    },
    askBusNo: function(query){
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: "What is Bus No.?",
                metadata: JSON.stringify( query )
            }
        };

        callSendAPI(messageData);

    },
    askDirection: function(query){

    },
    response: funtion(query){
    }
}
module.exports = Machine;
