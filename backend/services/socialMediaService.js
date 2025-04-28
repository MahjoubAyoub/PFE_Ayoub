exports.shareDesign = async (design, platform) => {
    console.log(`Sharing design ${design.id} to ${platform}`);
    return { success: true, platform };
  };
  