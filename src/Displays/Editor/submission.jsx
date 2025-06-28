const langToCode = {
    cpp: 54,
    python: 92,
    javascript: 93,
    java: 91
};

async function getSubmission(tokenId) {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e8e00a942dmsh4c787cdd6f935c5p197469jsna17e4a38c7ee',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    return await response.json();
}

export async function makeSubmission({ code, lang, callback, stdin = "" }) {
    const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'e8e00a942dmsh4c787cdd6f935c5p197469jsna17e4a38c7ee',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            language_id: langToCode[lang],
            source_code: btoa(code),
            stdin: btoa(stdin)
        })
    };

    try {
        callback({ apiStatus: 'loading' });

        const response = await fetch(url, options);
        const res = await response.json();

        const tokenId = res.token;
        if (!tokenId) {
            callback({
                apiStatus: 'error',
                message: 'No token returned from Judge0.'
            });
            return;
        }

        let result;
        let statusId = 1;

        while (statusId === 1 || statusId === 2) {
            await new Promise(r => setTimeout(r, 500));
            result = await getSubmission(tokenId);

            if (!result || !result.status) {
                callback({
                    apiStatus: 'error',
                    message: 'Invalid response from Judge0 API'
                });
                return;
            }

            statusId = result.status_id;
            console.log("STaT ID: ", statusId);
            console.log("Polling result:", result);

        }

        callback({
            apiStatus: 'success',
            data: {
                status_id: statusId,
                stdout: result.stdout,
                stderr: result.stderr,
                compile_output: result.compile_output,
                time: result.time,
                memory: result.memory
            }
        });

    } catch (error) {
        callback({
            apiStatus: 'error',
            message: error.message || JSON.stringify(error)
        });
    }
}
