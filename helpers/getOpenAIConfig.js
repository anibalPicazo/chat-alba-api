function getOpenAIConfig(messages, tools = [], stream = false) {
    return {
        model: 'gpt-4o',
        messages,
        temperature: 0.8,
        top_p: 1.0,
        presence_penalty: 0.5,
        frequency_penalty: 0.2,
        max_tokens: 500,
        tools,
        tool_choice: tools.length > 0 ? 'auto' : 'none',
        stream
    };
}

module.exports = { getOpenAIConfig };