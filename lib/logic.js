/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.microtask.buycoin} tx
 * @transaction
 */
async function buycoin(tx) {
    // save gia tri coin cua company
    const oldCoin = tx.company.coin;

    // new coinvalue = old coinvalue + value
    tx.company.coin = oldCoin + tx.value;

    // Get the participant registry for the participant.
    const participantRegistry = await getParticipantRegistry('org.microtask.company');
    // Update the participant company in the asset registry.
    await participantRegistry.update(tx.company);
  
  	
}


/**
 * Sample transaction
 * @param {org.microtask.registerjob} tx
 * @transaction
 */
async function registerjob(tx) {
  if(tx.request=='register' && tx.job.state=='empty')//dang ky job
  {
    // Save the old value coin of company.
    const oldCoin = tx.job.owner.coin;

    // Update the coin with the new value.
    tx.job.owner.coin = oldCoin - tx.job.salary;
    // Get the asset registry for the asset.
    const participantRegistry = await getParticipantRegistry('org.microtask.company');
    // Update the asset in the asset registry.
    await participantRegistry.update(tx.job.owner);
  	//update jobstate
  	tx.job.state="waitting";
  	// Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.microtask.job');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.job);
  } else if(tx.request=='complete' && tx.job.state=='waitting')//xac thuc job da hoan thanh
  {
    const oldCoin = tx.worker.coin;
    tx.worker.coin=oldCoin + tx.job.salary;
    const participantRegistry = await getParticipantRegistry('org.microtask.worker');
    // Update the asset in the asset registry.
    await participantRegistry.update(tx.worker);
  	//update jobstate
  	tx.job.state="complete";
  	// Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.microtask.job');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.job);
  }
}


