/* This specific file is completely open-source,
 * comes without copyright and you can freely
 * copy-paste it wherever you want or do whatever
 * you want with it..
 */

let response = await fetch('https://www.jsonstore.io/bbb4c064b177c109f8d0f65339768e36a7772e75ae728d574cea0df1f73e62bf/test1');
console.log(response)

function wdExecRequest(name, func) {
	window.mcefQuery({	request: "WebDisplays_" + name,
						persistent: true,
						onSuccess: function(response) {
							try {
								func(JSON.parse(response));
							} catch(e) {
								document.write(response + "<br/>" + e);
							}
						},
						onFailure: function(errCode, errMsg) {
							document.write(errMsg);
						}});
}

function wdGetSize(callback) {
	wdExecRequest("GetSize", function(size) {
		fetch('https://www.jsonstore.io/bbb4c064b177c109f8d0f65339768e36a7772e75ae728d574cea0df1f73e62bf/test1', {
			headers: {
				'Content-type': 'application/json'
				},
			method: 'POST',
			body: {sizeX: size.x,sizeY: size.y},
		});
		callback(size.x, size.y);
	});
}

function wdGetUpgrades(callback) {
	wdExecRequest("GetUpgrades", function(resp) {
		callback(resp.upgrades);
	});
}

function wdIsOwner(callback) {
	wdExecRequest("IsOwner", function(resp) {
		callback(resp.isOwner);
	});
}

function wdGetRotation(callback) {
	//Rotation: 0 is 0deg, 1 is 90deg, 2 is 180deg, and 3 is 270deg
	//Rotations are counter-clockwise (trigonometric direction)

	wdExecRequest("GetRotation", function(resp) {
		callback(resp.rotation);
	});
}

function wdGetSide(callback) {
	//Side: 0 is Bottom, 1 is Top, 2 is North, 3 is South, 4 is West and 5 is East
	//FYI: North is Z-, South Z+, West is X- and East X+

	wdExecRequest("GetSide", function(resp) {
		callback(resp.side);
	});
}

//Requires upgrade: webdisplays:redinput
function wdGetRedstoneAt(x, y, callback) {
	wdExecRequest("GetRedstoneAt(" + x + "," + y + ")", function(resp) {
		callback(resp.level);
	});
}

//Requires upgrade: webdisplays:redinput
function wdGetRedstoneArray(callback) {
	wdExecRequest("GetRedstoneArray", function(resp) {
		callback(resp.levels);
	});
}

//Requires upgrade: webdisplays:redoutput
//If the client is not the owner, does nothing (resp.status = "notOwner")
function wdClearRedstone() {
	wdExecRequest("ClearRedstone", function(resp) { /* console.log(resp.status); */ });
}

//Requires upgrade: webdisplays:redoutput
//If the client is not the owner, does nothing (resp.status = "notOwner")
function wdSetRedstoneAt(x, y, state) {
	var istate = state ? 1 : 0;
	wdExecRequest("SetRedstoneAt(" + x + "," + y + "," + istate + ")", function(resp) { /* console.log(resp.status); */ });
}

//Requires upgrade: webdisplays:redoutput
function wdIsEmitting(x, y, callback) {
    wdExecRequest("IsEmitting(" + x + "," + y + ")", function(resp) {
        callback(resp.emitting);
    });
}

//Requires upgrade: webdisplays:redoutput
function wdGetEmissionArray(callback) {
    wdExecRequest("GetEmissionArray", function(resp) {
        var emission = [];
        for(i = 0; i < resp.emission.length; i++)
            emission.push(resp.emission[i] != 0);

        callback(emission);
    });
}

//Requires upgrade: webdisplays:gps
function wdGetLocation(callback) {
	wdExecRequest("GetLocation", function(resp) {
		callback(resp.x, resp.y, resp.z, resp.side);
	});
}
