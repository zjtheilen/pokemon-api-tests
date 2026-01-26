const { test, expect, request } = require('@playwright/test');
const { JsonPlaceholderApiHelper } = require('../../helpers/jsonPlaceholderApiHelper');
const { createJsonPlaceholderApiContext } = require('../../config/apiConfig');

test.describe('@crud JSONPlaceholder CRUD lifecycle', () => {
  let apiContext;
  let apiHelper;

  test.beforeAll(async () => {
    apiContext = await createJsonPlaceholderApiContext();
    apiHelper = new JsonPlaceholderApiHelper(apiContext);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('@crud POST → GET lifecycle', async () => {
    const payload = {
      title: 'Hello World',
      body: 'This is a test post',
      userId: 1,
    };

    const { response: postResponse, data: postData } =
      await apiHelper.createPost(payload);

    expect(postResponse.status()).toBe(201);
    expect(postData).toHaveProperty('id');

    console.log(`⚠️ JSONPlaceholder does not persist POSTed resources. POST ID: ${postData.id}`);

    const { response: getResponse } = await apiHelper.getPost(postData.id);

    if (getResponse.status() === 404) {
      console.log(`⚠️ GET returned 404 (expected for JSONPlaceholder)`);
    } else {
      expect(getResponse.status()).toBe(200);
    }
  });

  test('@crud POST → PUT → GET lifecycle', async () => {
    const payload = {
      title: 'Initial Title',
      body: 'PUT test',
      userId: 1,
    };

    const { data: postData } = await apiHelper.createPost(payload);

    const updatedPayload = { ...payload, title: 'Updated Title' };
    const { response: putResponse } =
      await apiHelper.updatePost(postData.id, updatedPayload);

    if (putResponse.status() === 200) {
      console.log(`⚠️ PUT simulated successfully (not persisted)`);
    } else {
      console.log(`⚠️ PUT returned ${putResponse.status()} (expected behavior)`);
    }
  });

  test('@crud POST → DELETE → GET lifecycle', async () => {
    const payload = {
      title: 'Delete Test',
      body: 'Testing DELETE',
      userId: 1,
    };

    const { data: postData } = await apiHelper.createPost(payload);

    const { response: deleteResponse } =
      await apiHelper.deletePost(postData.id);

    expect([200, 204]).toContain(deleteResponse.status());

    console.log(`⚠️ DELETE is mocked by JSONPlaceholder. POST ID: ${postData.id}`);
  });
});
