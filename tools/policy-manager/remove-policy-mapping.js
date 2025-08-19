// Remove/delete a policy resource mapping in Okta

/**
 * Remove/delete a policy resource mapping in Okta.
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.policyId - The policy ID.
 * @param {string} args.mappingId - The mapping ID to remove.
 * @returns {Promise<Object>} - The result of the deletion.
 */
const executeFunction = async ({ policyId, mappingId }) => {
  if (!policyId) throw new Error('Policy ID is required');
  if (!mappingId) throw new Error('Mapping ID is required');

  console.log('=== REMOVE POLICY MAPPING DEBUG ===');
  console.log('Policy ID:', policyId);
  console.log('Mapping ID:', mappingId);
  console.log('===================================');

  // Import credentials helper
  const { getOktaCredentials } = await import('../../lib/tools.js');
  const { domain, apiToken } = await getOktaCredentials();
  const baseUrl = `https://${domain}`;
  
  // Use the DELETE endpoint: DELETE /api/v1/policies/{policyId}/mappings/{mappingId}
  const url = `${baseUrl}/api/v1/policies/${policyId}/mappings/${mappingId}`;
  
  console.log('Removing policy mapping at:', url);
  console.log('Method: DELETE');

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `SSWS ${apiToken}`,
      'Accept': 'application/json',
    },
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    let errorData;
    try { errorData = JSON.parse(errorText); } catch { errorData = { error: errorText }; }
    
    // Provide helpful error messages
    let errorMessage = `HTTP ${response.status}: ${JSON.stringify(errorData)}`;
    if (response.status === 400) {
      errorMessage += ' - The mapping may not exist or is invalid.';
    } else if (response.status === 404) {
      errorMessage += ' - The policy or mapping may not exist or you may not have permission to access it.';
    } else if (response.status === 403) {
      errorMessage += ' - You do not have permission to perform this action. Check your API token permissions.';
    }
    
    throw new Error(errorMessage);
  }
  
  console.log('✅ Policy mapping removed successfully');
  console.log('Response status:', response.status);
  
  return {
    success: true,
    policyId: policyId,
    mappingId: mappingId,
    message: `Policy mapping '${mappingId}' successfully removed from policy '${policyId}'`,
    note: 'This endpoint returns 204 No Content on success'
  };
};

const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'remove_policy_mapping',
      description: 'Remove/delete a policy resource mapping in Okta using DELETE /api/v1/policies/{policyId}/mappings/{mappingId}. This removes the association between a policy and a resource (like an application).',
      parameters: {
        type: 'object',
        properties: {
          policyId: { 
            type: 'string', 
            description: 'The policy ID from which to remove the mapping.' 
          },
          mappingId: { 
            type: 'string', 
            description: 'The mapping ID to remove. You can get this from list_policy_mappings.' 
          }
        },
        required: ['policyId', 'mappingId']
      }
    }
  }
};

export { apiTool };
